const PROJECT_VISUALS: Record<string, string> = {
  'serenoil-ai-customer-service-bot': '/project-visuals/serenoil-ai-customer-service-bot.webp',
  'gmail-notion-email-logger': '/project-visuals/gmail-notion-email-logger.webp',
  'claude-ai-tutorial-youtube': '/project-visuals/claude-ai-tutorial-youtube.webp',
  'ai-order-bot-burger-restaurant': '/project-visuals/ai-order-bot-burger-restaurant.webp',
  'docs-vector-uploader': '/project-visuals/docs-vector-uploader.webp',
  'beachfront-real-estate-sales-bot': '/project-visuals/beachfront-real-estate-sales-bot.webp',
  'restaurant-order-inventory-manager': '/project-visuals/restaurant-order-inventory-manager.webp',
  'real-estate-lead-qualifier-telegram': '/project-visuals/real-estate-lead-qualifier-telegram.webp',
  'master-tech-computer-store': '/project-visuals/master-tech-computer-store.webp',
  'serenoil-website': '/project-visuals/serenoil-website.webp',
  'linkedin-whatsapp-bot': '/project-visuals/linkedin-whatsapp-bot.webp',
  'serenoil-order-fulfillment-webhook': '/project-visuals/serenoil-order-fulfillment-webhook.webp',
  'thndr-stock-monitor': '/project-visuals/thndr-stock-monitor.webp',
  'arabic-youtube-script-generator': '/project-visuals/arabic-youtube-script-generator.webp',
  'cold-email-campaign-generator': '/project-visuals/cold-email-campaign-generator.webp',
  'content-repurposing-agent': '/project-visuals/content-repurposing-agent.webp',
  'linkedin-lead-scraper': '/project-visuals/linkedin-lead-scraper.webp',
  'serenoil-brain': '/project-visuals/serenoil-brain.webp',
  'ai-youtube-thumbnail-generator': '/project-visuals/ai-youtube-thumbnail-generator.webp',
  'website-builder-cinematic': '/project-visuals/website-builder-cinematic.webp',
  'remotion-animated-video-generator': '/project-visuals/remotion-animated-video-generator.webp',
  'agentic-competitor-analysis-workflow': '/project-visuals/agentic-competitor-analysis-workflow.webp',
  'hotel-maintenance-ai-system': '/project-visuals/hotel-maintenance-ai-system.webp',
  'daily-innovation-report-cleopatra-marsa-alam': '/project-visuals/daily-innovation-report-cleopatra-marsa-alam.webp',
  'financial-document-rag-pipeline': '/project-visuals/financial-document-rag-pipeline.webp',
  'vida-full-ai-agent': '/project-visuals/vida-full-ai-agent.webp',
  'ig-fb-comment-responder': '/project-visuals/igfb-comment-responder.webp',
};

export function projectImage(slug: string, fallback?: string | null) {
  return PROJECT_VISUALS[slug] ?? fallback ?? null;
}
