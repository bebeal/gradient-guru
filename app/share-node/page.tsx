'use client'

import { APP_HOST, PROTOCOL } from '@/utils/host';
import { redirect } from 'next/navigation';

const ReroutePageToApp = () => {
	// redirect /share-node to /
	return redirect(`${PROTOCOL}${APP_HOST}`);
}
export default ReroutePageToApp;
