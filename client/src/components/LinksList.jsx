import React from 'react';

const LinksList = ({links}) => {

  if(!links.length) {
    return <p className='center'>Ссылок пока нет!</p>
  }

  return (
    <table>
      <thead>
      <tr>
        <th>Ваши ссылки</th>
        <th>Оригинальная ссылка</th>
        <th>Клики</th>
        <th>Дата создания</th>
      </tr>
      </thead>

      <tbody>
      {links.map(link => (
        <tr key={link._id}>
          <td><a href={link.to} target='_blank' rel='noopener noreferrer'>{link.to}</a></td>
          <td><a href={link.from} target='_blank' rel='noopener noreferrer'>{link.from}</a></td>
          <td><strong>{link.clicks}</strong></td>
          <td>{<strong>{new Date(link.date).toLocaleDateString()}</strong>}</td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}

export default LinksList;