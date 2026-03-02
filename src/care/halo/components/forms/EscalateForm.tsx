import { useState } from 'react';
import { theme } from '../../design-system';

interface EscalateFormProps {
  residentName: string;
  onSubmit: (reason: string, severity: 'low' | 'medium' | 'high' | 'critical') => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const severityOptions = [
  { value: 'low', label: 'Low', color: theme.colors.info },
  { value: 'medium', label: 'Medium', color: theme.colors.warning },
  { value: 'high', label: 'High', color: theme.colors.error },
  { value: 'critical', label: 'Critical', color: '#B71C1C' },
] as const;

/**
 * EscalateForm Component
 * Alert escalation form para BottomSheet
 */
export function EscalateForm({ residentName, onSubmit, onCancel, isLoading }: EscalateFormProps) {
  const [reason, setReason] = useState('');
  const [severity, setSeverity] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reason.trim()) {
      onSubmit(reason.trim(), severity);
    }
  };

  const selectedSeverity = severityOptions.find((opt) => opt.value === severity);

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={theme.colors.error}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <h3 style={styles.title}>Escalate Alert</h3>
        </div>
        <p style={styles.subtitle}>{residentName}</p>
      </div>

      {/* Severity selector */}
      <div style={styles.field}>
        <label style={styles.label}>Alert Severity</label>
        <div style={styles.severityGrid}>
          {severityOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setSeverity(opt.value)}
              style={{
                ...styles.severityButton,
                ...(severity === opt.value
                  ? {
                      background: `${opt.color}15`,
                      borderColor: opt.color,
                      color: opt.color,
                    }
                  : {}),
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: opt.color,
                  marginRight: '6px',
                }}
              />
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Alert reason */}
      <div style={styles.field}>
        <label htmlFor="alert-reason" style={styles.label}>
          Reason for Escalation
        </label>
        <textarea
          id="alert-reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Describe the situation requiring escalation..."
          rows={4}
          style={styles.textarea}
          autoFocus
          disabled={isLoading}
        />
        <div style={styles.hint}>{reason.length} / 300 characters</div>
      </div>

      {/* Warning message */}
      <div
        style={{
          padding: theme.spacing.md,
          background: `${selectedSeverity?.color}10`,
          border: `1px solid ${selectedSeverity?.color}30`,
          borderRadius: theme.borderRadius.sm,
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: theme.typography.fontSize.sm,
            color: selectedSeverity?.color,
            fontWeight: theme.typography.fontWeight.medium,
          }}
        >
          This will notify the care team immediately.
        </p>
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
            background: selectedSeverity?.color,
            opacity: !reason.trim() || isLoading ? 0.5 : 1,
          }}
          disabled={!reason.trim() || isLoading}
        >
          {isLoading ? 'Escalating...' : 'Escalate Alert'}
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
    marginLeft: '32px', // Align with title (icon width + gap)
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
  severityGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: theme.spacing.sm,
  },
  severityButton: {
    padding: theme.spacing.sm,
    background: theme.colors.background.secondary,
    border: `1.5px solid ${theme.colors.border.light}`,
    borderRadius: theme.borderRadius.sm,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.secondary,
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    border: 'none',
    borderRadius: theme.borderRadius.md,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    color: '#FFFFFF',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
};
