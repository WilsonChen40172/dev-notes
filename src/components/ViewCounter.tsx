'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Props {
    slug: string
}

const enabled = process.env.NEXT_PUBLIC_ENABLE_VIEW_COUNTER !== 'false'

export default function ViewCounter({ slug }: Props) {
    useEffect(() => {
        if (!enabled || !supabase) return
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') return

        supabase
            .rpc('increment_view', { page_slug: slug })
            .then(({ error }) => {
                if (error) console.error('[ViewCounter] rpc error:', error)
            })
    }, [slug])

    return null
}
