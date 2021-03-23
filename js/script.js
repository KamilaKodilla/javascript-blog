'use strict';
{
  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* [IN PROGRESS] add class 'active' to the clicked link */

    console.log('clickedElement:', clickedElement);

    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.post');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');

    /* find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);

    /* add class 'active' to the correct article */

    targetArticle.classList.add('active');

  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-';
    //optAuthorsListSelector = '.authors.list',
    //optCloudClassPrefix = 'author-size-';

  function generateTitleLinks(customSelector = ''){

    /* remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* for each article */
 console.log(customSelector);
    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    let html = '';
    for(let article of articles){

      /* get the article id */

      const articleId = article.getAttribute('id');

      /* find the title element */
      /* get the title from the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      /* insert link into titleList */

      html = html + linkHTML;
    }
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  }

  generateTitleLinks();

  function calculateTagsParams(tags){
    const params = {max: 0, min: 999999};
    for(let tag in tags){
      console.log(tag + ' is used ' + tags[tag] + ' times');
    if(tags[tag] > params.max){
      params.max = tags[tag];
    } else if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
    return params;
  }

  calculateTagsParams();

  function calculateTagClass(count, params){
  const classNumber = Math.floor( ( (count - params.min) / (params.max - params.min) ) * optCloudClassCount + 1 );

  return optCloudClassPrefix + classNumber;
  }

  function generateTags(){
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for(let article of articles){
      /* find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector);
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
        console.log(tag);
        /* generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '"<span>' + tag + '</span></a></li>';
        /* add generated code to html variable */
        html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
        } else {
          allTags[tag]++;
          }

      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;
    /* END LOOP: for every article: */
    }

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');

    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams)

    /* [NEW] create variable for all links HTML code */
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
      /* [NEW] generate code of a link and add it to allTagsHTML */
      allTagsHTML += '<a href="#tag-' + tag + '">' + tag + ' (' + allTags[tag] + ') ' + '</a>';
      const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li>' + ' ';
      console.log('tagLinkHTML:', tagLinkHTML);

      /* [NEW] END LOOP: for each tag in allTags: */
      }
    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;

  }

  generateTags();

  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    /* find all tag links with class active */
    const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each active tag link */
    for(let tagLink of tagLinks){
      /* remove class active */
      tagLink.classList.remove('active');
    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagHrefs = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    for(let tagHref of tagHrefs){
      /* add class active */
      tagHref.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags(){
    /* find all links to tags */
    const tagHrefs = document.querySelectorAll('a[href^="#tag-"]');
    /* START LOOP: for each link */
    for(let tagHref of tagHrefs){
      /* add tagClickHandler as event listener for that link */
      tagHref.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
  }

  addClickListenersToTags();

  /*zadanie*/

  function calculateAuthorsParams(authors) {
  const params = {max: 0, min: 999999};
  for(let author in authors){
    if(authors[author] > params.max) {
      params.max = authors[author];
    } else if(authors[author] < params.min) {
      params.min = authors[author];
    }

 }
 return params;
 }

  function calculateAuthorClass(count, params){
    const classNumber = Math.floor( ( (count - params.min) / (params.max - params.min) ) * optCloudClassCount + 1 );
    return optCloudClassPrefix + classNumber;

  }


  function generateAuthors(){

    /* [NEW] create a new variable allAuthors with an empty array */
     let allAuthors = {};

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for(let article of articles){
      /* find authors wrapper */
      const authorWrapper = article.querySelector(optArticleAuthorSelector);

      /* make html variable with empty string */
      let html = '';
      /* get authors from data-author attribute */
      const author = article.getAttribute('data-author');
      /* generate HTML of the link */
      const authorHTML = '<a href="#author-' + author + '"<span>' + author + '</span></a>';

     /* add generated code to html variable */
      html = html + authorHTML;

      /* [NEW] check if this link is NOT already in allAuthors */
      if(!allAuthors[author]) {
        /* [NEW] add generated code to allAuthors array */
        allAuthors[author] = 1;
        }else{
          allAuthors[author]++;
      }

    /* insert HTML of all the links into the authors wrapper */
      authorWrapper.innerHTML = html;
    /* END LOOP: for every article: */
    }

    /* [NEW] find list of authors in right column */
    const authorList = document.querySelector('.authors');

    /* [NEW] create variable for all links HTML code */
    let allAuthorsHTML = '';

    /* [NEW] START LOOP: for each author in allAuthors: */
    for(let author in allAuthors){
    /* [NEW] generate code of a link and add it to allAuthorsHTML */
     allAuthorsHTML += '<a href="#author-' + author + '">' + author + ' (' + allAuthors[author] + ')' + '</a>';
    /* [NEW] END LOOP: for each author in allAuthors: */
   }

    /*[NEW] add HTML from allAuthorsHTML to authorList */
  authorList.innerHTML = allAuthorsHTML;
  }

  generateAuthors();

  function authorClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "author" and extract author from the "href" constant */
    const author = href.replace('#author-', '');
    /* find all authors links with class active */
    const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');
    /* START LOOP: for each active tag link */
    for(let authorLink of authorLinks){
      /* remove class active */
      authorLink.classList.remove('active');
    /* END LOOP: for each active tag link */
    }
    /* find all author links with "href" attribute equal to the "href" constant */
    const authorHrefs = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found author link */
    for(let authorHref of authorHrefs){
      /* add class active */
      authorHref.classList.add('active');
    /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks('[data-author="' + author + '"]');
  }

  function addClickListenersToAuthors(){
    /* find all links to authors */
    const authorHrefs = document.querySelectorAll('a[href^="#author-"]');
    /* START LOOP: for each link */
    for(let authorHref of authorHrefs){
      /* add tagClickHandler as event listener for that link */
      authorHref.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
    }
  }

  addClickListenersToAuthors();

}
