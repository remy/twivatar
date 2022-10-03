const junk = ['favicon.ico'];

const get = async (username, size) => {
  const timestamp = new Date().toJSON().replace(/\D/g, '');
  const url = `https://web.archive.org/web/${timestamp}/https://twitter.com/${username}`;

  const res = await fetch(url);
  const body = await res.text();

  const m = body.match(/<img.*?src="([\S]*(?:profile_images)[^\"]*?)"/);

  if (m.length < 2) {
    return null;
  }

  const match = m[1];
  return (
    'https' +
    match
      .replace(/_(?:(?:\d+)x(?:\d+))\.(jpeg|jpg|gif|png)/, '_' + size + '.$1')
      .split('https')
      .pop()
  );
};

export default async (req, context) => {
  const { method } = req;

  const query = new URL(req.url).searchParams;

  const username = query.get('username');
  const size = query.get('size') || 'normal';

  if (junk.includes(username)) {
    return new Response(null, { status: 204 });
  }

  let location = await get(username, size);
  if (size === 'original') {
    location = location.replace('_original.', '.');
  }

  return new Response(302, {
    headers: {
      location,
    },
  });
};
