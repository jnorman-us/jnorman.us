import React, {useEffect} from 'react';

export default function BlogListPage() {
    useEffect(() => {
        document.title = "Blog - jnorman.us";
    }, []);

    return (
        <div>
            Blog page, coming soon...
        </div>
    );
}