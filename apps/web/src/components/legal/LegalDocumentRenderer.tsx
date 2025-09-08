"use client";

import React from 'react';
import { Separator } from '@/components/ui/separator';
import ReactMarkdown from 'react-markdown';

interface LegalDocumentRendererProps {
  markdownContent: string;
  compact?: boolean;
}

export default function LegalDocumentRenderer({ 
  markdownContent, 
  compact = false 
}: LegalDocumentRendererProps) {
  const h2 = compact ? "text-lg font-semibold" : "text-xl font-semibold";
  const h3 = compact ? "text-sm font-semibold" : "text-base font-semibold";
  const section = compact ? "space-y-2" : "space-y-3";
  const sep = compact ? "my-4" : "my-6";

  // Helper function to generate anchor IDs from heading text
  const generateAnchorId = (children: React.ReactNode): string => {
    const text = React.Children.toArray(children)
      .map(child => {
        if (typeof child === 'string') return child;
        if (React.isValidElement(child) && 'props' in child && typeof child.props.children === 'string') {
          return child.props.children;
        }
        return '';
      })
      .join('');
    
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s]+/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  };

  // Custom components for markdown rendering
  const components = {
    h2: ({ children, ...props }: any) => {
      const id = generateAnchorId(children);
      return (
        <h2 id={id} className={h2} {...props}>
          {children}
        </h2>
      );
    },
    h3: ({ children, ...props }: any) => {
      const id = generateAnchorId(children);
      return (
        <h3 id={id} className={h3} {...props}>
          {children}
        </h3>
      );
    },
    p: ({ children, ...props }: any) => (
      <p className="text-sm" {...props}>
        {children}
      </p>
    ),
    strong: ({ children, ...props }: any) => (
      <strong className="font-semibold" {...props}>
        {children}
      </strong>
    ),
    em: ({ children, ...props }: any) => (
      <em className="italic" {...props}>
        {children}
      </em>
    ),
    ul: ({ children, ...props }: any) => (
      <ul className="list-disc list-inside space-y-1" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: any) => (
      <ol className="list-decimal list-inside space-y-1" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }: any) => (
      <li className="text-sm" {...props}>
        {children}
      </li>
    ),
    table: ({ children, ...props }: any) => (
      <div className="overflow-x-auto my-4">
        <table className="min-w-full border-collapse border border-gray-300" {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }: any) => (
      <thead className="bg-gray-50" {...props}>
        {children}
      </thead>
    ),
    tbody: ({ children, ...props }: any) => (
      <tbody {...props}>
        {children}
      </tbody>
    ),
    tr: ({ children, ...props }: any) => (
      <tr className="border-b border-gray-200" {...props}>
        {children}
      </tr>
    ),
    th: ({ children, ...props }: any) => (
      <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-sm" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }: any) => (
      <td className="border border-gray-300 px-3 py-2 text-sm" {...props}>
        {children}
      </td>
    ),
    hr: () => <Separator className={sep} />,
    a: ({ href, children, ...props }: any) => (
      <a 
        href={href} 
        className="text-blue-600 hover:text-blue-800 underline" 
        {...props}
      >
        {children}
      </a>
    ),
    blockquote: ({ children, ...props }: any) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700" {...props}>
        {children}
      </blockquote>
    ),
  };

  return (
    <div className="text-sm">
      <ReactMarkdown components={components}>
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
}
