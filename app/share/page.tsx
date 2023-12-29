'use client'

import { APP_HOST, PROTOCOL } from '@/utils';
import { redirect } from 'next/navigation'

const ReroutePageToApp = () => {
	// redirect gradient-guru.com/share to gradient-guru.com
	return redirect(`${PROTOCOL}${APP_HOST}`)
}
export default ReroutePageToApp;
