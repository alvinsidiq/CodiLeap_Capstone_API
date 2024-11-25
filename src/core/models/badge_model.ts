import { z } from "zod";

export const BadgeRequirement = z.object({
  requirement: z.string().min(1)
});

export const Badge = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  imageUrl: z.string().min(1),
  requirements: z.array(z.string()).optional()
});

export type AddNewBadgeType = z.infer<typeof Badge>;
export type UpdateBadgeType = Partial<AddNewBadgeType>;

export interface BadgeResponse {
  earnedBadges: {
    id: number;
    title: string;
    description?: string;
    imageUrl: string;
    earnedAt: Date;
  }[];
  availableBadges: {
    id: number;
    title: string;
    description?: string;
    requirements: string[];
  }[];
}