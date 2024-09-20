import { Suspense, ComponentType } from 'react';

function withSuspense<P extends object>(
    Component: ComponentType<P>,
    fallback: React.ReactNode = <div>Loading...</div>
) {
    // Ensure the component properly receives props of type P
    const SuspenseWrapper: React.FC<P> = (props) => (
        <Suspense fallback={fallback}>
            <Component {...props} />
        </Suspense>
    );

    return SuspenseWrapper;
}

export default withSuspense;
