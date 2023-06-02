import {map} from 'rxjs/operators'

export const structure = (S, context) => {
  const {documentStore, schema} = context

  const customDocumentTypes = schema._original.types.filter(
    (type) => type.type === 'document' && !type.name.startsWith('sanity.')
  )

  return S.list()
    .title('Content')
    .items(
      customDocumentTypes.map((documentType) => {
        return S.listItem()
          .id(documentType.name)
          .title(documentType.title)
          .child(
            documentStore
              .listenQuery(`count(*[_type == '${documentType.name}'])`)
              .pipe(
                map((count) => S.documentTypeList(documentType.name).title(`Documents: ${count}`))
              )
          )
      })
    )
}
