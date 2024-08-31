import { ForumTabs } from "@/features/career/components/ForumTabs";

export const metadata = {
  title: 'SEO Title',
  description: 'SEO Title',
};

interface Props {
  children: React.ReactNode;
  params: {
    careerSlug: string;
  }
}



export default async function CareerLayout({ children, params }: Props) {
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
    <div className="">
      <ForumTabs tabs={tabs}/>
      {children}
    </div>
  )
}