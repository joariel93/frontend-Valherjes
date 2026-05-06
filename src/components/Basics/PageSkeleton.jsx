import { Skeleton } from 'primereact/skeleton';

const PageSkeleton = ({ type = 'list', count = 3 }) => {
    if (type === 'cards') {
        return (
            <div className="grid">
                {Array.from({ length: count }).map((_, i) => (
                    <div key={i} className="col-12 md:col-4 p-3">
                        <Skeleton height="200px" className="mb-2" />
                        <Skeleton width="70%" className="mb-2" />
                        <Skeleton width="90%" />
                    </div>
                ))}
            </div>
        );
    }

    if (type === 'detail') {
        return (
            <div className="p-4">
                <Skeleton width="60%" height="2rem" className="mb-3" />
                <Skeleton width="30%" className="mb-4" />
                <Skeleton height="300px" className="mb-3" />
                <Skeleton className="mb-2" />
                <Skeleton className="mb-2" />
                <Skeleton width="80%" />
            </div>
        );
    }

    // type === 'list'
    return (
        <div className="p-4">
            <Skeleton width="40%" height="2rem" className="mb-4" />
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="flex align-items-center gap-3 mb-3">
                    <Skeleton shape="circle" size="3rem" />
                    <div className="flex-1">
                        <Skeleton width="70%" className="mb-2" />
                        <Skeleton width="40%" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PageSkeleton;