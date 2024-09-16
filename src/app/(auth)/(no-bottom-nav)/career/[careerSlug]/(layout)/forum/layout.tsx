import { ServerTabs } from "@/features/career/components/ServerTabs";
import NewPost from "@/shared/components/PostForm/NewPostDrawer";
import { Toaster } from "@/components/ui/toaster";

interface Props {
  children: React.ReactNode;
  params: {
    careerSlug: string;
  };
}

export default async function CareerForumLayout({ children, params }: Props) {
  const { careerSlug } = params;

  const tabs = [
    {
      text: "Testimonios",
      path: `/career/${careerSlug}/forum/testimonies`,
    },
    {
      text: "Preguntas",
      path: `/career/${careerSlug}/forum/questions`,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky z-40 top-0 border-b bg-background">
        <ServerTabs tabs={tabs} />
      </div>
      <div className="flex-grow">
        <NewPost />
        <div className="px-4 sm:px-6 lg:px-8">{children}</div>
      </div>
      <Toaster />
    </div>
  );
}
