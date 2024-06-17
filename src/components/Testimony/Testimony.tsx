import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import Reactions from "@/components/Reactions/Reactions";
import UserAvatar from "@/user/components/UserAvatar";
import SkeletonText from "@/components/Skeletons/SkeletonText";
import TestimonyImages from "@/components/Testimony/TestimonyImages";

type TestimonyProps = {
  userName?: string;
  userPhotoUrl?: string;
  postTime?: string;
  career?: string;
  content?: string;
  heartCount?: number;
  commentCount?: number;
  imageUrls?: string[];
};

export default function Testimony({
  userName,
  userPhotoUrl,
  postTime,
  career,
  content,
  heartCount,
  commentCount,
  imageUrls,
}: TestimonyProps) {
  return (
    <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-4 mb-4 relative">
      <div className="absolute top-2 right-2">
        <FontAwesomeIcon
          icon={faEllipsisVertical}
          className="text-gray-500 w-6 h-6 m-4"
        />
      </div>
      <div className="mt-10 xs:mt-4">
        <UserAvatar
          name={userName}
          photoUrl={userPhotoUrl}
          width={48}
          height={48}
        />
        <div className="ml-16">
          <div className="mt-2">
            {postTime ? (
              <p className="text-gray-500">{postTime}</p>
            ) : (
              <SkeletonText width="50px" height="1rem" />
            )}
          </div>
          <div className="text-gray-500 mt-2 font-semibold">
            {career ? (
              <p>{career}</p>
            ) : (
              <SkeletonText width="80px" height="1rem" />
            )}
          </div>
          <div className="mt-4">
            {content ? (
              <p className="text-gray-700 max-w-xs">{content}</p>
            ) : (
              <>
                <SkeletonText width="100%" height="1rem" className="mb-2" />
                <SkeletonText width="90%" height="1rem" className="mb-2" />
                <SkeletonText width="95%" height="1rem" />
              </>
            )}
            {imageUrls && <TestimonyImages imageUrls={imageUrls} />}
          </div>
          <Reactions heartCount={heartCount} commentCount={commentCount} />
        </div>
      </div>
    </div>
  );
}