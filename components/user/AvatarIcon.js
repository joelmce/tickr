import { getAvatar } from '@lib/avatar.js'

export function AvatarIcon({ userId }) {
  const image = getAvatar(userId);

  return <img src={image} className="rounded-full" />
}
