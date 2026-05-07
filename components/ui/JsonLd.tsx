type Props = {
  schema: object | object[]
}

export default function JsonLd({ schema }: Props) {
  const schemas = Array.isArray(schema) ? schema : [schema]

  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  )
}
