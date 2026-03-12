'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Props {
    slug: string
}

const enabled = process.env.NEXT_PUBLIC_ENABLE_VIEW_COUNTER !== 'false'

export default function ViewCounter({ slug }: Props) {
    useEffect(() => {
        console.log('[ViewCounter] enabled:', enabled, '| supabase:', !!supabase)
        if (!enabled || !supabase) return

        supabase.rpc('increment_view', { page_slug: slug }).then(({ error }) => {
            if (error) console.error('[ViewCounter] rpc error:', error)
            else console.log('[ViewCounter] ok, slug:', slug)
        })
    }, [slug])

    return null
}
