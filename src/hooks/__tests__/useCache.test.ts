
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCache, cacheManager } from '../useCache';

// Helper function to wait for async operations
const waitForNextUpdate = () => new Promise(resolve => setTimeout(resolve, 0));

describe('useCache', () => {
  beforeEach(() => {
    cacheManager.clear();
    vi.clearAllMocks();
  });

  it('should cache data after first fetch', async () => {
    const mockFetch = vi.fn().mockResolvedValue('test data');
    
    const { result } = renderHook(() => 
      useCache('test-key', mockFetch)
    );

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current.data).toBe('test data');
    expect(mockFetch).toHaveBeenCalledTimes(1);

    // Second render should use cache
    const { result: result2 } = renderHook(() => 
      useCache('test-key', mockFetch)
    );

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result2.current.data).toBe('test data');
    // Should not call fetch again
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should handle fetch errors', async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error('Fetch failed'));
    
    const { result } = renderHook(() => 
      useCache('test-key', mockFetch)
    );

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current.error).toBe('Fetch failed');
    expect(result.current.data).toBeNull();
  });

  it('should invalidate cache when requested', async () => {
    const mockFetch = vi.fn()
      .mockResolvedValueOnce('first data')
      .mockResolvedValueOnce('second data');
    
    const { result } = renderHook(() => 
      useCache('test-key', mockFetch)
    );

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current.data).toBe('first data');

    // Invalidate and refetch
    await act(async () => {
      result.current.invalidateCache();
      await result.current.refetch(true);
    });

    expect(result.current.data).toBe('second data');
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it('should respect TTL settings', async () => {
    const shortTTL = 100; // 100ms
    const mockFetch = vi.fn().mockResolvedValue('test data');
    
    renderHook(() => 
      useCache('test-key', mockFetch, shortTTL)
    );

    // Wait for TTL to expire
    await new Promise(resolve => setTimeout(resolve, 150));

    // New render should fetch again
    renderHook(() => 
      useCache('test-key', mockFetch, shortTTL)
    );

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(mockFetch).toHaveBeenCalledTimes(2);
  });
});

describe('CacheManager', () => {
  beforeEach(() => {
    cacheManager.clear();
  });

  it('should store and retrieve data', () => {
    cacheManager.set('key1', 'value1');
    expect(cacheManager.get('key1')).toBe('value1');
  });

  it('should return null for expired data', async () => {
    cacheManager.set('key1', 'value1', 50); // 50ms TTL
    
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(cacheManager.get('key1')).toBeNull();
  });

  it('should invalidate by pattern', () => {
    cacheManager.set('user-1', 'data1');
    cacheManager.set('user-2', 'data2');
    cacheManager.set('post-1', 'data3');
    
    cacheManager.invalidatePattern('user-');
    
    expect(cacheManager.get('user-1')).toBeNull();
    expect(cacheManager.get('user-2')).toBeNull();
    expect(cacheManager.get('post-1')).toBe('data3');
  });

  it('should track cache size', () => {
    expect(cacheManager.size()).toBe(0);
    
    cacheManager.set('key1', 'value1');
    cacheManager.set('key2', 'value2');
    
    expect(cacheManager.size()).toBe(2);
    
    cacheManager.clear();
    expect(cacheManager.size()).toBe(0);
  });
});
