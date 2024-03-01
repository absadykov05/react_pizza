import *as React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
    <ContentLoader className="pizza-block-wrapper"
                   speed={2}
                   width={315}
                   height={461}
                   viewBox="0 0 280 461"
                   backgroundColor="#f3f3f3"
                   foregroundColor="#ecebeb"
    >
        <circle cx="130" cy="131" r="126"/>
        <rect x="0" y="306" rx="15" ry="15" width="260" height="88"/>
        <rect x="5" y="405" rx="0" ry="0" width="90" height="27"/>
        <rect x="136" y="401" rx="17" ry="17" width="126" height="40"/>
        <rect x="0" y="271" rx="0" ry="0" width="260" height="27"/>
    </ContentLoader>
)

export default Skeleton;
