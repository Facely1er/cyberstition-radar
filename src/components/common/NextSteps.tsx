import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, ChevronRight, MessageSquare, Users, Image as ImageIcon, Mail } from 'lucide-react';

type EntryPoint = 'messages' | 'profiles' | 'images' | 'email';
type Origin = 'email' | 'profile' | 'message' | 'unknown';
type ToolKey = 'messages' | 'profiles' | 'images' | 'email';

const originOptions: Array<{ value: Origin; label: string }> = [
  { value: 'email', label: 'Email' },
  { value: 'profile', label: 'Social profile' },
  { value: 'message', label: 'Direct message' },
  { value: 'unknown', label: 'Not sure' },
];

const defaultOriginByEntry: Record<EntryPoint, Origin> = {
  messages: 'message',
  profiles: 'profile',
  images: 'message',
  email: 'email',
};

const toolMeta: Record<ToolKey, { label: string; to: string; description: string; icon: React.ReactNode }> = {
  messages: {
    label: 'Message Detective',
    to: '/messages',
    description: 'Analyze message content for scam and manipulation patterns.',
    icon: <MessageSquare size={16} />,
  },
  profiles: {
    label: 'Profile Checker',
    to: '/profiles',
    description: 'Verify profile authenticity and identify deception signals.',
    icon: <Users size={16} />,
  },
  images: {
    label: 'Image Inspector',
    to: '/images',
    description: 'Inspect image metadata and detect manipulation indicators.',
    icon: <ImageIcon size={16} />,
  },
  email: {
    label: 'Email Analyzer',
    to: '/email',
    description: 'Analyze email headers for spoofing and routing anomalies.',
    icon: <Mail size={16} />,
  },
};

const entryRecommendations: Record<EntryPoint, ToolKey[]> = {
  messages: ['profiles', 'images'],
  email: ['profiles', 'messages'],
  profiles: ['messages', 'images'],
  images: ['messages', 'profiles'],
};

const originPriority: Record<Origin, ToolKey | null> = {
  email: 'email',
  profile: 'profiles',
  message: 'messages',
  unknown: null,
};

const originSummary: Record<Origin, string> = {
  email: 'Email selected. Verify sender identity and header authenticity.',
  profile: 'Social profile selected. Verify profile authenticity and context.',
  message: 'Direct message selected. Cross-check message content and sender identity.',
  unknown: 'Not sure. Start with the most common verification checks.',
};

export default function NextSteps({ entryPoint }: { entryPoint: EntryPoint }) {
  const [origin, setOrigin] = useState<Origin>(defaultOriginByEntry[entryPoint]);

  const { recommendations, highlightTool } = useMemo(() => {
    const list: ToolKey[] = [];
    const priorityTool = originPriority[origin];

    if (priorityTool && priorityTool !== entryPoint) {
      list.push(priorityTool);
    }

    entryRecommendations[entryPoint].forEach((tool) => {
      if (tool !== entryPoint && !list.includes(tool)) {
        list.push(tool);
      }
    });

    return {
      recommendations: list,
      highlightTool: priorityTool && priorityTool !== entryPoint ? priorityTool : null,
    };
  }, [entryPoint, origin]);

  return (
    <section className="card next-steps">
      <div className="kicker" style={{ color: 'var(--text)' }}>
        <Compass size={16} /> Recommended next steps
      </div>
      <p className="small" style={{ marginTop: 6 }}>
        Select the content source to prioritize the next verification step.
      </p>
      <div className="choice-group" role="group" aria-label="Content origin">
        {originOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setOrigin(option.value)}
            className={`choice-chip ${origin === option.value ? 'active' : ''}`}
            aria-pressed={origin === option.value}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className="small" style={{ marginTop: 8 }}>
        {originSummary[origin]}
      </div>
      <div className="link-list" style={{ marginTop: 14 }}>
        {recommendations.map((toolKey) => {
          const tool = toolMeta[toolKey];
          const isHighlighted = highlightTool === toolKey;
          return (
            <Link key={tool.to} to={tool.to} className="link-card">
              <div className="link-content">
                <div className="link-icon">{tool.icon}</div>
                <div className="link-meta">
                  <div className="link-title">{tool.label}</div>
                  <div className="link-desc">{tool.description}</div>
                </div>
              </div>
              <div className="link-actions">
                {isHighlighted && <span className="link-badge">Recommended</span>}
                <ChevronRight size={16} />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
