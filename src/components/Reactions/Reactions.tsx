import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment, faShare } from "@fortawesome/free-solid-svg-icons";
import SkeletonText from "@/components/Skeletons/SkeletonText";

interface ReactionsProps {
  heartCount?: number;
  commentCount?: number;
}

export default function Reactions({
  heartCount,
  commentCount,
}: ReactionsProps) {
  return (
    <div className="flex space-x-4 mt-4">
      <button className="flex items-center space-x-1 text-green">
        <FontAwesomeIcon icon={faHeart} className="w-4 h-4" />
        <span className="text-black">
          {heartCount !== undefined ? (
            heartCount
          ) : (
            <SkeletonText width="20px" height="1rem" />
          )}
        </span>
      </button>
      <button className="flex items-center space-x-1 text-green">
        <FontAwesomeIcon icon={faComment} className="w-4 h-4" />
        <span className="text-black">
          {commentCount !== undefined ? (
            commentCount
          ) : (
            <SkeletonText width="20px" height="1rem" />
          )}
        </span>
      </button>
      <button className="flex items-center space-x-1 text-green">
        <FontAwesomeIcon icon={faShare} className="w-4 h-4" />
      </button>
    </div>
  );
}
