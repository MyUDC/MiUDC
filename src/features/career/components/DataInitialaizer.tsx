'use client'
import { PostWithRelations } from '@/shared/types/PostWithRelations';
import { useCareerStore } from '../../../stores/useCareerStore';

interface Props {
  careerId: string
  initialTestimonies: PostWithRelations[];
  initialQuestions: PostWithRelations[];
}

export default function DataInitializer({ careerId, initialTestimonies, initialQuestions }: Props) {
  useCareerStore.setState({
    careerId,
    initialTestimonies,
    initialQuestions
  })

  return null;
}
