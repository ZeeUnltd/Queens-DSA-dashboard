import { MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useAuth } from '../../context/AuthContext'
import { relationshipManagerFixture } from '../../fixtures/dashboard'

function RelationshipManagerProfile() {
  const manager = relationshipManagerFixture
  const { session } = useAuth()
  const user = session?.userDetails
  const name = `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim() || manager.name
  const initials = `${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`.toUpperCase()
  const role = user?.role ?? user?.roles?.[0] ?? manager.role

  return (
    <section className="mb-8 flex items-center gap-3" aria-label="Relationship manager profile">
      <Avatar className="h-11 w-11 border border-qm-border bg-[#edf3f8]">
        <AvatarFallback className="bg-[#e3eef5] text-sm font-semibold text-qm-brand">{initials || 'RM'}</AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-lg font-bold tracking-[-0.02em] text-qm-ink">{name}</h1>
          <Badge className="border-0 bg-[#dff0ff] px-2 py-0.5 text-[10px] font-medium text-[#1687d3] hover:bg-[#dff0ff]">{role}</Badge>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-qm-muted">
          <span className="flex items-center gap-1"><MapPin className="h-3 w-3 text-qm-brand" />{manager.location}</span>
          <span><strong className="font-semibold text-qm-ink">Grade:</strong> {manager.grade}</span>
          <span><strong className="font-semibold text-qm-ink">Referral code:</strong> {user?.userName ?? manager.referralCode}</span>
        </div>
      </div>
    </section>
  )
}

export default RelationshipManagerProfile
