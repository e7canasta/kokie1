import { useState } from 'react';
import { theme } from '../../design-system';

interface NoteFormProps {
  residentName: string;
  onSubmit: (content: string, category: 'observation' | 'medication' | 'behavior' | 'other') => void;
  onCancel: () => void;
  isLoading?: boolean;
}

/**
 * NoteForm Component
 * Quick note form para BottomSheet
 */
export function NoteForm({ residentName, onSubmit, onCancel, isLoading }: NoteFormProps) {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'observation' | 'medication' | 'behavior' | 'other'>('observation');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content.trim(), category);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.header}>
        <h3 style={styles.title}>Add Note</h3>
        <p style={styles.subtitle}>{residentName}</p>
      </div>

      {/* Category selector */}
      <div style={styles.field}>
        <label style={styles.label}>Category</label>
        <div style={styles.categoryGrid}>
          {(['observation', 'medication', 'behavior', 'other'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              style={{
                ...styles.categoryButton,
                ...(category === cat ? styles.categoryButtonActive : {}),
              }}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Note content */}
      <div style={styles.field}>
        <label htmlFor="note-content" style={styles.label}>
          Note
        </label>
        <textarea
          id="note-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter your observation..."
          rows={4}
          style={styles.textarea}
          autoFocus
          disabled={isLoading}
        />
        <div style={styles.hint}>{content.length} / 500 characters</div>
      </div>

      {/* Actions */}
      <div style={styles.actions}>
        <button type="button" onClick={onCancel} style={styles.cancelButton} disabled={isLoading}>
          Cancel
        </button>
        <button
          type="submit"
          style={{
            ...styles.submitButton,
            opacity: !content.trim() || isLoading ? 0.5 : 1,
          }}
          disabled={!content.trim() || isLoading}
        >
          {isLoading ? 'Saving...' : 'Save Note'}
        </button>
      </div>
    </form>
  );
}

const styles: Record<string, React.CSSProperties> = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.lg,
  },
  header: {
    paddingBottom: theme.spacing.md,
    borderBottom: `1px solid ${theme.colors.border.light}`,
  },
  title: {
    margin: 0,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    margin: 0,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm,
  },
  label: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
  },
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: theme.spacing.sm,
  },
  categoryButton: {
    padding: theme.spacing.sm,
    background: theme.colors.background.secondary,
    border: `1.5px solid ${theme.colors.border.light}`,
    borderRadius: theme.borderRadius.sm,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.secondary,
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  categoryButtonActive: {
    background: theme.colors.primary[50],
    borderColor: theme.colors.primary[500],
    color: theme.colors.primary[500],
  },
  textarea: {
    padding: theme.spacing.md,
    border: `1.5px solid ${theme.colors.border.medium}`,
    borderRadius: theme.borderRadius.md,
    fontSize: theme.typography.fontSize.base,
    fontFamily: 'inherit',
    resize: 'vertical' as const,
    minHeight: '100px',
    outline: 'none',
    transition: 'border-color 0.15s ease',
  },
  hint: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.tertiary,
    textAlign: 'right' as const,
  },
  actions: {
    display: 'flex',
    gap: theme.spacing.md,
    paddingTop: theme.spacing.md,
  },
  cancelButton: {
    flex: 1,
    padding: theme.spacing.md,
    background: theme.colors.background.secondary,
    border: `1.5px solid ${theme.colors.border.medium}`,
    borderRadius: theme.borderRadius.md,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  submitButton: {
    flex: 1,
    padding: theme.spacing.md,
    background: theme.colors.primary[500],
    border: 'none',
    borderRadius: theme.borderRadius.md,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.inverse,
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
};
