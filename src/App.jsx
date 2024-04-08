import { useState } from 'react'
import './styles.css'
import Header from './components/Header'
import Article from './components/Article'
import archivedArticles from './data/archivedArticles'
import favoritedArticles from './data/favoritedArticles'
import savedArticles from './data/savedArticles'
import trashedArticles from './data/trashedArticles'

export default function App() {
  const [articleQueue, setArticleQueue] = useState(savedArticles)

  const stats = getStats()

  const articleComponents = articleQueue.map((articleData) => {
    return <Article articleData={articleData} key={articleData.id} />
  })

  const noArticlesMessage = (
    <p className='no-articles-message'>burada gösterilecek makale yok.</p>
  )

  function getStats() {
    return {
      numOfFavorites: favoritedArticles.length,
      numOfArchived: archivedArticles.length,
      numOfTrashed: trashedArticles.length,
    }
  }

  function getTargetArticle(id) {
    return savedArticles.find((item) => item.id === id)
  }

  function removeFromSavedArticles(targetArticle) {
    const targetIndex = savedArticles.indexOf(targetArticle)
    savedArticles.splice(targetIndex, 1)
  }

  /*-----State Ayarlama Fonksiyonları-------------------------------------------*/

  function favorite(id) {
    const targetArticle = getTargetArticle(id)
    if (favoritedArticles.includes(targetArticle)) {
      const targetIndex = favoritedArticles.indexOf(targetArticle)
      favoritedArticles.splice(targetIndex, 1)
    } else {
      favoritedArticles.push(targetArticle)
    }
    setArticleQueue([...savedArticles])
  }

  function archive(id) {
    const targetArticle = getTargetArticle(id)
    removeFromSavedArticles(targetArticle)
    archivedArticles.push(targetArticle)
    setArticleQueue([...savedArticles])
  }

  function trash(id) {
    const targetArticle = getTargetArticle(id)
    removeFromSavedArticles(targetArticle)
    if (favoritedArticles.includes(targetArticle)) {
      const targetIndex = favoritedArticles.indexOf(targetArticle)
      favoritedArticles.splice(targetIndex, 1)
    }
    trashedArticles.push(targetArticle)
    setArticleQueue([...savedArticles])
  }

  function toggleExpand(id) {
    const targetArticle = getTargetArticle(id)
    targetArticle.expanded = !targetArticle.expanded
    setArticleQueue([...savedArticles])
  }


  const handleClick = (e)=>{
const type = e.target.dataset.buttonType
const id = e.target.dataset.articleId
console.log(type,id)
if (type=== "favorite") {
  favorite(id)
} else if (type==="archive"){
  archive(id)
} else if(type==="trash"){
  trash(id)
} else {
  toggleExpand(id)
}
  }


  return (
    <div className='wrapper'>
      <Header stats={stats} setArticleQueue={setArticleQueue} />
      <div className='articles-container' onClick={handleClick}>
        {articleQueue.length > 0 ? articleComponents : noArticlesMessage}
      </div>
    </div>
  )
}
