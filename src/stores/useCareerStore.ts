import { create } from "zustand"
import {Post} from "prisma/prisma-client"
import { PostWithRelations } from '../shared/types/PostWithRelations';
export const useCareerStore = create<{
  initialTestimonies: PostWithRelations[],
  initialQuestions: PostWithRelations[],
  careerId: string
}>(() => ({
  initialTestimonies: [],
  initialQuestions: [],
  careerId: ""
}))