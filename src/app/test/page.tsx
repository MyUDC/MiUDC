import { EndMessage } from "@/shared/components/Testimony/PostList/EndMessage";
import { Refresh } from "@/shared/components/Testimony/PostList/Refresh";
import Post from "@/shared/components/Testimony/Post";

export default function Page() {
  return (
    <div className="flex flex-col items-center">
      <Refresh/>
      <Post
        userName="Roberto Pedragonosa"
        testimonySlug=""
        userPhotoUrl="/svgs/user.svg"
        content="Mi experiencia por la licenciatura de Arquitectura fue bastante grata, ya que conocí grandes compañeros como maestros. Las materias te enseñan más de lo que crees."
        heartCount={12}
        repliesCount={4}
        imageUrls={[]}
        createdAt={new Date()}
      />
      <EndMessage />
      <Post
        testimonySlug=""
        userName="Roberto Pedragonosa"
        userPhotoUrl="/svgs/user.svg"
        content="Mi experiencia por la licenciatura de Arquitectura fue bastante grata, ya que conocí grandes compañeros como maestros. Las materias te enseñan más de lo que crees."
        heartCount={12}
        repliesCount={4}
        imageUrls={[
          "/svgs/logo-full.svg",
        ]}
        createdAt={new Date()}
      />
      <Post
        testimonySlug=""
        userName="Roberto Pedragonosa"
        userPhotoUrl="/svgs/user.svg"
        content="Mi experiencia por la licenciatura de Arquitectura fue bastante grata, ya que conocí grandes compañeros como maestros. Las materias te enseñan más de lo que crees."
        heartCount={12}
        repliesCount={4}
        imageUrls={[
          "/svgs/logo-full.svg",
          "/svgs/logo-inline.svg",
        ]}
        createdAt={new Date()}
      />
      <Post
        testimonySlug=""
        userName="Roberto Pedragonosa"
        userPhotoUrl="/svgs/user.svg"
        content="Mi experiencia por la licenciatura de Arquitectura fue bastante grata, ya que conocí grandes compañeros como maestros. Las materias te enseñan más de lo que crees."
        heartCount={12}
        repliesCount={4}
        imageUrls={[
          "/svgs/logo-full.svg",
          "/svgs/logo-inline.svg",
          "/svgs/onboarding1.svg",
        ]}
        createdAt={new Date()}
      />
      <Post
        testimonySlug=""
        userName="Roberto Pedragonosa"
        userPhotoUrl="/svgs/user.svg"
        content="Mi experiencia por la licenciatura de Arquitectura fue bastante grata, ya que conocí grandes compañeros como maestros. Las materias te enseñan más de lo que crees."
        heartCount={12}
        repliesCount={4}
        imageUrls={[
          "/svgs/logo-full.svg",
          "/svgs/logo-inline.svg",
          "/svgs/onboarding1.svg",
          "/svgs/logo-full.svg",
          "/svgs/logo-inline.svg",
          "/svgs/onboarding1.svg",
          "/svgs/logo-full.svg",
        ]}
        createdAt={new Date()}
      />

    </div>
  );
}
