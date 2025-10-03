"use client";

import React from 'react';
import { Separator } from '@/components/ui/separator';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import DOMPurify from 'dompurify';

interface LegalDocumentRendererProps {
  markdownContent: string;
  compact?: boolean;
}

export default function LegalDocumentRenderer({ 
  markdownContent, 
  compact = false 
}: LegalDocumentRendererProps) {
  const h2 = compact ? "text-lg font-bold mb-3 text-primary break-words" : "text-xl font-bold mb-4 text-primary break-words";
  const h3 = compact ? "text-sm font-semibold mb-2 text-secondary-700 break-words" : "text-base font-semibold mb-3 text-secondary-700 break-words";
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
    h1: ({ children, ...props }: any) => {
      const id = generateAnchorId(children);
      return (
        <h1 id={id} className="text-xl sm:text-2xl font-bold mb-4 text-primary break-words" {...props}>
          {children}
        </h1>
      );
    },
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
    h4: ({ children, ...props }: any) => {
      const id = generateAnchorId(children);
      return (
        <h4 id={id} className="text-sm font-semibold mb-2 text-accent-700 break-words" {...props}>
          {children}
        </h4>
      );
    },
    h5: ({ children, ...props }: any) => {
      const id = generateAnchorId(children);
      return (
        <h5 id={id} className="text-sm font-medium mb-2 text-black-600 break-words" {...props}>
          {children}
        </h5>
      );
    },
    h6: ({ children, ...props }: any) => {
      const id = generateAnchorId(children);
      return (
        <h6 id={id} className="text-sm font-medium mb-2 text-black-500 break-words" {...props}>
          {children}
        </h6>
      );
    },
    p: ({ children, ...props }: any) => (
      <p className="text-sm mb-3 break-words leading-relaxed" {...props}>
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
      <ul className="list-disc list-inside space-y-2 mb-4 break-words" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: any) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 break-words" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }: any) => (
      <li className="text-sm break-words leading-relaxed" {...props}>
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
      <thead className="bg-primary/10" {...props}>
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
      <th className="border border-gray-300 px-2 sm:px-3 py-2 text-left font-semibold text-xs sm:text-sm text-primary break-words" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }: any) => (
      <td className="border border-gray-300 px-2 sm:px-3 py-2 text-xs sm:text-sm break-words" {...props}>
        {children}
      </td>
    ),
    hr: () => <Separator className={sep} />,
    a: ({ href, children, ...props }: any) => (
      <a 
        href={href} 
        className="text-accent-600 hover:text-accent-800 underline font-medium" 
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
    u: ({ children, ...props }: any) => (
      <u className="underline" {...props}>
        {children}
      </u>
    ),
  };

  return (
    <div className="text-sm space-y-4 max-w-full overflow-hidden">
      <ReactMarkdown 
        components={components}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      >
        {DOMPurify.sanitize(markdownContent)}
      </ReactMarkdown>
    </div>
  );
}
