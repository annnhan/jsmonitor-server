/**
 * Created by an.han on 16/11/27.
 */

module.exports = request => {
  const ua = request.headers['user-agent'];
  return (ua.indexOf('Android') >= 0 || ua.indexOf('iPhone') >= 0 )
    ? 'mobile'
    : 'web';
}