'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Props {
    slug: string
}

export default function ViewCounter({ slug }: Props) {
    const [views, setViews] = useState<number | null>(null)

    useEffect(() => {
        async function incrementAndFetch() {
            // 遞增 view count
            await supabase.rpc('increment_view', { page_slug: slug })

            // 讀取最新數值
            const { data } = await supabase
                .from('page_views')
                .select('view_count')
                .eq('slug', slug)
                .single()

            if (data) setViews(data.view_count)
        }

        incrementAndFetch()
    }, [slug])

    if (views === null) return null

    return (
        <span className="text-xs text-neutral-400 dark:text-neutral-500 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
            </svg>
            {views.toLocaleString()} 次閱讀
        </span>
    )
}
