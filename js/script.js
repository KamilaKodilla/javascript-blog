'use strict';

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
  
   /* [IN PROGRESS] add class 'active' to the clicked link */
    
    console.log('clickedElement:', clickedElement);

    clickedElement.classList.add('active');
    
    /* [DONE] remove class 'active' from all articles */
    
    const activeArticles = document.querySelectorAll('.post');

    for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
    }
  
    /* get 'href' attribute from the clicked link */
   
    const articleSelector = clickedElement.getAttribute('href')

    console.log(articleSelector);

    /* find the correct article using the selector (value of 'href' attribute) */
  
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);

    /* add class 'active' to the correct article */
    
    targetArticle.classList.add('active');
 
    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
    }
  }

  /* lesson 6.5*/

    const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

  function generateTitleLinks(){

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  
  const articles = document.querySelectorAll(optArticleSelector);
    let html = '';
    for(let article of articles){
    console.log(html);

  /* get the article id */
  
  const articleId = clickedElement.getAttribute('id')
    console.log(articleId);

  /* find the title element */

   /* get the title from the title element */

  const articleTitle = article.querySelector(optTitleSelector).innerHTML;

  /* create HTML of the link */
  const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);
  
    /* insert link into titleList */

    html = html + linkHTML;
  }
  titleList.innerHTML = html;
}
 
generateTitleLinks();

  const links = document.querySelectorAll('.titles a');
  console.log(links);
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
