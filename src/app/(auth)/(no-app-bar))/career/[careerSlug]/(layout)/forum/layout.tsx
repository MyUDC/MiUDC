import { ForumTabs } from "@/features/career/components/ForumTabs";

interface Props {
  children: React.ReactNode;
  params: {
    careerSlug: string;
  }
}

export default async function CareerForumLayout({ children, params }: Props) {
  const { careerSlug } = params;

  const tabs = [
    {
      text: 'Testimonios',
      path: `/career/${careerSlug}/forum/testimonies`
    },
    {
      text: 'Preguntas',
      path: `/career/${careerSlug}/forum/questions`
    },
  ]

  return (
    <div>
      <ForumTabs tabs={tabs} />
      <div>
        {children}
      </div>
    </div>
  )
}