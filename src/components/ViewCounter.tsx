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

        supabase.rpc('increment_view', { page_slug: slug })
    }, [slug])

    return null
}
