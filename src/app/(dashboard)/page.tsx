import { auth } from '@/auth';

import { protectServer } from '@/features/auth/utils';
import { Banner } from './banner';

export default async function Home() {
    await protectServer();

    const session = await auth();

    return (
        <div className="mx-auto flex max-w-screen-xl flex-col space-y-6 pb-10">
            <Banner />
        </div>
    );
}
