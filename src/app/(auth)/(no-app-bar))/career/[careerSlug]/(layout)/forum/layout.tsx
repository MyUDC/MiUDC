import { ServerTabs } from "@/features/career/components/ServerTabs";

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
      <div className="sticky z-50 top-0">
        <ServerTabs tabs={tabs} />
      </div>
      <div>
        {children}
      </div>
    </div>
  )
}