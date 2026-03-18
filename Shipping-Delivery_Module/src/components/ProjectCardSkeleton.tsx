export default function ProjectCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-md animate-pulse" role="status" aria-label="Loading project card">
      <div className="w-14 h-14 rounded-xl bg-gray-200 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
