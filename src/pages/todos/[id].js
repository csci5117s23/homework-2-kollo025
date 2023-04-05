import Link from 'next/link'
import { useRouter } from 'next/router'

export default function TodoID() {
    const router = useRouter()
    const { id } = router.query
    // key value parameter --> ask router
  return (
    <>
    <div><Link href="/">ID: {id}</Link></div>
    </>
  )
}