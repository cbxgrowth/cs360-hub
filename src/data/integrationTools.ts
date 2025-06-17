
import { 
  Building,
  TrendingUp,
  TrendingDown,
  Headphones,
  Users,
  MessageSquare,
  Video,
  Mail,
  Settings,
  Calendar,
  CheckCircle,
  Cloud,
  Upload,
  Database,
  Camera
} from 'lucide-react';

export const integrationTools = [
  // CRM & Sales
  { 
    name: 'Salesforce', 
    icon: Building, 
    category: 'CRM', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg', 
    color: 'from-blue-500 to-blue-600' 
  },
  { 
    name: 'HubSpot', 
    icon: TrendingUp, 
    category: 'CRM', 
    logo: 'https://www.hubspot.com/hubfs/HubSpot_Logos/HubSpot-Inversed-Favicon.png', 
    color: 'from-orange-500 to-orange-600' 
  },
  { 
    name: 'Pipedrive', 
    icon: TrendingDown, 
    category: 'CRM', 
    logo: 'https://cdn.worldvectorlogo.com/logos/pipedrive.svg', 
    color: 'from-green-500 to-green-600' 
  },
  { 
    name: 'Freshworks', 
    icon: Users, 
    category: 'CRM', 
    logo: 'https://www.freshworks.com/static-assets/images/common/company/logos/logo-fworks-black.svg', 
    color: 'from-green-400 to-emerald-500' 
  },
  
  // Support & Communication
  { 
    name: 'Zendesk', 
    icon: Headphones, 
    category: 'Support', 
    logo: 'https://d1eipm3vz40hy0.cloudfront.net/images/AMER/zendesk-logo.png', 
    color: 'from-green-600 to-teal-600' 
  },
  { 
    name: 'Slack', 
    icon: MessageSquare, 
    category: 'Communication', 
    logo: 'https://a.slack-edge.com/80588/marketing/img/meta/slack_hash_256.png', 
    color: 'from-purple-500 to-pink-500' 
  },
  { 
    name: 'Microsoft Teams', 
    icon: Video, 
    category: 'Communication', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg', 
    color: 'from-blue-600 to-indigo-600' 
  },
  { 
    name: 'WhatsApp Business', 
    icon: MessageSquare, 
    category: 'Communication', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg', 
    color: 'from-green-500 to-green-600' 
  },
  
  // Email
  { 
    name: 'Gmail', 
    icon: Mail, 
    category: 'Email', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg', 
    color: 'from-red-500 to-pink-500' 
  },
  { 
    name: 'Outlook', 
    icon: Mail, 
    category: 'Email', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg', 
    color: 'from-blue-600 to-indigo-600' 
  },
  { 
    name: 'Mailchimp', 
    icon: Mail, 
    category: 'Marketing', 
    logo: 'https://eep.io/images/yzco4xsimv0y/SBCJdrpEaAYAU2dV5BrkJA/e91bf92b-6e8b-42b2-a97d-d63478f32a72/MC_MonkeyRewards_Icon.png', 
    color: 'from-yellow-500 to-orange-500' 
  },
  
  // Automation & Integration
  { 
    name: 'Make (Integromat)', 
    icon: Settings, 
    category: 'Automation', 
    logo: 'https://www.make.com/en/help/image/uuid-2d4a5606-e634-4134-e32e-61b4270d32bb.png', 
    color: 'from-purple-500 to-indigo-500' 
  },
  { 
    name: 'n8n', 
    icon: Settings, 
    category: 'Automation', 
    logo: 'https://n8n.io/n8n-logo.png', 
    color: 'from-pink-500 to-purple-500' 
  },
  
  // Project Management
  { 
    name: 'Trello', 
    icon: CheckCircle, 
    category: 'Project Management', 
    logo: 'https://cdn.worldvectorlogo.com/logos/trello.svg', 
    color: 'from-blue-500 to-teal-500' 
  },
  { 
    name: 'Notion', 
    icon: Calendar, 
    category: 'Productivity', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png', 
    color: 'from-gray-600 to-gray-700' 
  },
  
  // Cloud & Storage
  { 
    name: 'AWS', 
    icon: Cloud, 
    category: 'Cloud', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg', 
    color: 'from-orange-500 to-yellow-500' 
  },
  { 
    name: 'Google Cloud', 
    icon: Cloud, 
    category: 'Cloud', 
    logo: 'https://cloud.google.com/_static/cloud/images/social-icon-google-cloud-1200-630.png', 
    color: 'from-blue-500 to-green-500' 
  },
  { 
    name: 'Microsoft Azure', 
    icon: Cloud, 
    category: 'Cloud', 
    logo: 'https://swimburger.net/media/ppnn3pcl/azure.png', 
    color: 'from-blue-600 to-indigo-600' 
  },
  { 
    name: 'Dropbox', 
    icon: Upload, 
    category: 'Storage', 
    logo: 'https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_glyph_2015-03.svg', 
    color: 'from-blue-500 to-cyan-500' 
  },
  
  // Enterprise
  { 
    name: 'SAP', 
    icon: Building, 
    category: 'ERP', 
    logo: 'https://www.sap.com/dam/application/shared/logos/sap-logo-svg.svg', 
    color: 'from-blue-600 to-indigo-700' 
  },
  { 
    name: 'Oracle', 
    icon: Database, 
    category: 'Database', 
    logo: 'https://logos-world.net/wp-content/uploads/2020/09/Oracle-Logo-1982-2019.png', 
    color: 'from-red-600 to-red-700' 
  },
  { 
    name: 'Salesforce Service Cloud', 
    icon: Headphones, 
    category: 'Support', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg', 
    color: 'from-blue-500 to-cyan-500' 
  },
  { 
    name: 'ServiceNow', 
    icon: Settings, 
    category: 'ITSM', 
    logo: 'https://logos-world.net/wp-content/uploads/2021/09/ServiceNow-Logo.png', 
    color: 'from-green-600 to-teal-600' 
  }
];

export const categoriesIntegrations = [
  { name: 'Todos', value: 'all', count: integrationTools.length },
  { name: 'CRM', value: 'CRM', count: integrationTools.filter(t => t.category === 'CRM').length },
  { name: 'Communication', value: 'Communication', count: integrationTools.filter(t => t.category === 'Communication').length },
  { name: 'Support', value: 'Support', count: integrationTools.filter(t => t.category === 'Support').length },
  { name: 'Email', value: 'Email', count: integrationTools.filter(t => t.category === 'Email').length },
  { name: 'Cloud', value: 'Cloud', count: integrationTools.filter(t => t.category === 'Cloud').length },
  { name: 'Automation', value: 'Automation', count: integrationTools.filter(t => t.category === 'Automation').length }
];
