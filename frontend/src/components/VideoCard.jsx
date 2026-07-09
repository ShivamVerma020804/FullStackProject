import { Link } from "react-router-dom";

const VideoCard = ({ video, compact = false }) => {
  return (
    <Link
      to={`/watch/${video._id}`}
      className="block group"
    >
      {/* Thumbnail */}

      <div className="overflow-hidden rounded-xl">

        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full aspect-video object-cover rounded-xl group-hover:scale-105 transition duration-300"
        />

      </div>

      {/* Content */}

      <div className="flex gap-3 mt-3">

        {/* Show avatar only on Home Feed */}

        {!compact && video.owner && (
          <img
            src={video.owner.avatar}
            alt={video.owner.username}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
        )}

        <div className="flex-1">

          <h3 className="font-semibold text-base line-clamp-2">
            {video.title}
          </h3>

          {/* Hide owner name on Profile Page */}

          {!compact && video.owner && (
            <p className="text-sm text-gray-500 mt-1">
              {video.owner.fullName}
            </p>
          )}

          <div className="text-xs text-gray-400 mt-1 flex gap-2">

            <span>{video.views} views</span>

            {video.createdAt && (
              <>
                <span>•</span>

                <span>
                  {new Date(
                    video.createdAt
                  ).toLocaleDateString()}
                </span>
              </>
            )}

          </div>

        </div>

      </div>
    </Link>
  );
};

export default VideoCard;