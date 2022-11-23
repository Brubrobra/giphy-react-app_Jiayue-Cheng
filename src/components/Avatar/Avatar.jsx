import './Avatar.scss';
export const Avatar = ({image}) => {
	return image.user && image.user.avatar_url && <img className='avatar' src={image.user.avatar_url}/>

}
