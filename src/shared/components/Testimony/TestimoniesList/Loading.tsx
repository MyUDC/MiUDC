import UserAvatar from '@/features/user/components/UserAvatar'
import SkeletonText from '../../Skeletons/SkeletonText'

export const Loading = () => {
  return (
    <div>
      <div className="h-[155px] overflow-hidden max-w-lg bg-white rounded-t-lg p-4  relative border border-gray-200">
        <div className="mt-10 xs:mt-4">
          <UserAvatar
            width={48}
            height={48}
            showName
          />
          <div className="ml-16">
            <div className="mt-2">
              <p className="text-gray-500">
                <SkeletonText width="100px" height="1rem" />
              </p>
            </div>
            <div className="text-gray-500 mt-2 font-semibold">
              <SkeletonText width="80px" height="1rem" />
            </div>
            <div className="mt-4">
              <SkeletonText width="100%" height="1rem" className="mb-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
