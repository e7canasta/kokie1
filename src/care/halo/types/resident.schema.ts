/**
 * Zod Schemas - Runtime Validation
 * Protege contra cambios inesperados del backend y errores en runtime
 */

import { z } from 'zod';

/**
 * Wellness schemas
 */
export const WellnessTrendSchema = z.enum(["Low", "Medium", "High"]);

export const WellnessSchema = z.object({
  trend: WellnessTrendSchema,
  previousTrend: WellnessTrendSchema,
});

/**
 * WellnessDataItem schema
 */
export const WellnessDataItemSchema = z.object({
  label: z.string(),
  value: z.string().optional(),
  icon: z.string().optional(),
  current: z.string().optional(),
  previous: z.string().optional(),
  hasArrow: z.boolean().optional(),
});

/**
 * TopCareItem schema
 */
export const TopCareItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  done: z.boolean(),
});

/**
 * Resident schema - Core entity
 */
export const ResidentSchema = z.object({
  id: z.number(),
  name: z.string(),
  dob: z.string(),
  room: z.string(),
  bed: z.string().optional(),
  unit: z.string(),
  age: z.number().int().positive(),
  wellness: WellnessSchema,
  avatarGradient: z.string(),
  image: z.string().url(),
  wellnessData: z.array(WellnessDataItemSchema).optional(),
  topCare: z.array(TopCareItemSchema).optional(),
  colors: z.array(z.string()).optional(),
  starred: z.boolean().optional(),
  // Computer Vision
  hasCV: z.boolean().optional(),
  lastCVDetection: z.number().optional(),
  // Triage Assistant
  triageScore: z.number().min(0).max(100).optional(),
  triageReason: z.enum(["alert", "next-in-round", "recent-change", "assigned"]).optional(),
});

/**
 * Array of residents
 */
export const ResidentsArraySchema = z.array(ResidentSchema);

/**
 * Rounding status
 */
export const RoundingStatusSchema = z.enum(["visited", "pending", "overdue"]);

/**
 * RoomGroup schema
 */
export const RoomGroupSchema = z.object({
  room: z.string(),
  unit: z.string(),
  residents: z.array(ResidentSchema),
  roundingStatus: RoundingStatusSchema,
  lastVisitedMinutesAgo: z.number().optional(),
});

/**
 * CareActivity schema
 */
export const CareActivitySchema = z.object({
  activity: z.string(),
  initiated: z.string(),
  uninitiated: z.string(),
  total: z.string(),
});

/**
 * Type inference - mantiene sincronización con TypeScript types
 */
export type ResidentSchemaType = z.infer<typeof ResidentSchema>;
export type WellnessSchemaType = z.infer<typeof WellnessSchema>;
export type WellnessDataItemSchemaType = z.infer<typeof WellnessDataItemSchema>;
export type TopCareItemSchemaType = z.infer<typeof TopCareItemSchema>;
