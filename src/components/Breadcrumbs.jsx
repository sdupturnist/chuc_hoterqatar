import Link from "next/link"



export default function Breadcrumbs({ pages }) {
  return (
    <div className="breadcrumbs text-sm">
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {pages && pages.map((item, key) => {
         return (
            <li className="capitalize" key={key}>
              {item.link && <Link href={item.link}>
                {item.name}
              </Link>}
              {!item.link && <span className="text-gray-400">{item.name}</span>}
            </li>
          )
        })}
      </ul>
    </div>
  )
}


