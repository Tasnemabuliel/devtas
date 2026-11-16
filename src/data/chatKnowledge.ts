import { getFeaturedProjects } from './projects'

export type ChatQuickAction = {
  id: string
  labelKey: string
  /** reply i18n key or special action */
  action: 'reply' | 'lead' | 'whatsapp' | 'projects' | 'services'
  replyKey?: string
}

export const chatQuickActions: ChatQuickAction[] = [
  { id: 'services', labelKey: 'chatbot.quick.services', action: 'services', replyKey: 'chatbot.replies.services' },
  { id: 'projects', labelKey: 'chatbot.quick.projects', action: 'projects', replyKey: 'chatbot.replies.projects' },
  { id: 'process', labelKey: 'chatbot.quick.process', action: 'reply', replyKey: 'chatbot.replies.process' },
  { id: 'contact', labelKey: 'chatbot.quick.contact', action: 'lead' },
  { id: 'whatsapp', labelKey: 'chatbot.quick.whatsapp', action: 'whatsapp' },
]

export const projectTypeOptions = [
  { id: 'website', labelKey: 'chatbot.lead.types.website' },
  { id: 'system', labelKey: 'chatbot.lead.types.system' },
  { id: 'landing', labelKey: 'chatbot.lead.types.landing' },
  { id: 'other', labelKey: 'chatbot.lead.types.other' },
] as const

export function featuredProjectSlugs() {
  return getFeaturedProjects().map((p) => p.slug)
}
