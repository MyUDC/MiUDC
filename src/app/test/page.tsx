import Testimony from "@/components/Testimony/Testimony";

export default function Page() {
  return (
    <div className="flex flex-col items-center">
      <Testimony
        userName="Roberto Pedragonosa"
        userPhotoUrl="/svgs/user.svg"
        career="Arquitectura"
        content="Mi experiencia por la licenciatura de Arquitectura fue bastante grata, ya que conocí grandes compañeros como maestros. Las materias te enseñan más de lo que crees."
        heartCount={12}
        commentCount={4}
        imageUrls={[]}
        createdAt={new Date()}
      />
      <Testimony
        userName="Roberto Pedragonosa"
        userPhotoUrl="/svgs/user.svg"
        career="Arquitectura"
        content="Mi experiencia por la licenciatura de Arquitectura fue bastante grata, ya que conocí grandes compañeros como maestros. Las materias te enseñan más de lo que crees."
        heartCount={12}
        commentCount={4}
        imageUrls={[
          "/svgs/logo-full.svg",
        ]}
        createdAt={new Date()}
      />
      <Testimony
        userName="Roberto Pedragonosa"
        userPhotoUrl="/svgs/user.svg"
        career="Arquitectura"
        content="Mi experiencia por la licenciatura de Arquitectura fue bastante grata, ya que conocí grandes compañeros como maestros. Las materias te enseñan más de lo que crees."
        heartCount={12}
        commentCount={4}
        imageUrls={[
          "/svgs/logo-full.svg",
          "/svgs/logo-inline.svg",
        ]}
        createdAt={new Date()}
      />
      <Testimony
        userName="Roberto Pedragonosa"
        userPhotoUrl="/svgs/user.svg"
        career="Arquitectura"
        content="Mi experiencia por la licenciatura de Arquitectura fue bastante grata, ya que conocí grandes compañeros como maestros. Las materias te enseñan más de lo que crees."
        heartCount={12}
        commentCount={4}
        imageUrls={[
          "/svgs/logo-full.svg",
          "/svgs/logo-inline.svg",
          "/svgs/onboarding1.svg",
        ]}
        createdAt={new Date()}
      />
      <Testimony
        userName="Roberto Pedragonosa"
        userPhotoUrl="/svgs/user.svg"
        career="Arquitectura"
        content="Mi experiencia por la licenciatura de Arquitectura fue bastante grata, ya que conocí grandes compañeros como maestros. Las materias te enseñan más de lo que crees."
        heartCount={12}
        commentCount={4}
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
