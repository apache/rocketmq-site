import React from "react";
import clsx from "clsx";
import styles from "./LogoCarousel.module.css";
import Link from '@docusaurus/Link'
const INTERVAL_LENGTH = 5000;
const LOGO_WIDTH = 150;

let ticks = 0;

export default class LogoCarousel extends React.Component {
  // constructor (props) {
  //     super(props)
  //     this.state = {
  //         position: -0,
  //         activePage: 0,
  //         swapInterval: 0,
  //         pages: Math.ceil(props.logos ? props.logos.length / 6 : 1),
  //         margin: 70
  //     }

  //     this.containerRef = React.createRef()
  // }

  // componentDidMount() {
  //     const rect = this.containerRef.current.getBoundingClientRect()
  //     const logosPerPage = Math.floor(rect.width / LOGO_WIDTH)
  //     this.setState({
  //         swapInterval: setInterval(this.nextPage.bind(this), INTERVAL_LENGTH),
  //         pages: Math.ceil(this.props.logos ? this.props.logos.length / logosPerPage : 1),
  //         margin: rect.width < 700 ? 0 : 70
  //     })
  // }

  // componentWillUnmount () {
  //     clearInterval(this.state.swapInterval)
  // }

  // animateTo (i) {
  //     const width = this.containerRef.current.getBoundingClientRect().width - this.state.margin
  //     const x = i * -width
  //     this.setState({ position: x, activePage: i })
  // }

  // handleClick (i) {
  //     this.animateTo(i)
  //     clearInterval(this.state.swapInterval)
  //     this.setState({
  //         swapInterval: setInterval(this.nextPage.bind(this), INTERVAL_LENGTH)
  //     })
  // }

  // nextPage () {
  //     const pages = this.state.pages - 1
  //     const direction = Math.floor(ticks / pages) % 2
  //     this.animateTo(direction
  //         ? pages - (ticks % pages)
  //         : ticks % pages
  //     )
  //     ++ticks
  // }

  render() {
    // if (!this.props || !this.props.logos) {
    //     return (
    //         <div></div>
    //     )
    // }

    // this.buttons = () => [...Array(this.state.pages)].map((_, index) => (
    //     <button onClick={() => this.handleClick(index)} key={index} className={clsx(styles.button, index === this.state.activePage ? styles.buttonActive : '')}>{index + 1}</button>
    // ))

    // this.list = () => (
    //     <ul style={{ transform: `translate(${this.state.position}px, 0px)` }}>
    //         {this.props.logos.map((value, index) => (
    //             <li key={index}><a href={value.url} target="_blank" rel="noopener noreferrer"><img src={'/img/logos/' + value.img} alt={value.alt} /></a></li>
    //         ))}
    //     </ul>
    // )

    return (
      // <ul class="brands">
      //   <li class="brands__item">
      //     <a href="#">
      //       <img src="/img/logos/xmly.jpeg" alt="" />
      //     </a>
      //   </li>
      //   <li class="brands__item">
      //     <a href="#">
      //       <img src="/img/logos/tongcheng.jpeg" alt="" />
      //     </a>
      //   </li>
      //   <li class="brands__item">
      //     <a href="#">
      //       <img src="/img/logos/xhs.png" alt="" />
      //     </a>
      //   </li>
      //   <li class="brands__item">
      //     <a href="#">
      //       <img src="/img/logos/huawei.jpeg" alt="" />
      //     </a>
      //   </li>

      //   <li class="brands__item">
      //     <a href="#">
      //       <img src="/img/logos/guangda.png" alt="" />
      //     </a>
      //   </li>
      //   <li class="brands__item">
      //     <a href="#">
      //       <img src="/img/logos/douyin.png" alt="" />
      //     </a>
      //   </li>
      //   <li class="brands__item">
      //     <a href="#">
      //       <img src="/img/logos/huawei.jpeg" alt="" />
      //     </a>
      //   </li>
      //   <li class="brands__item">
      //     <a href="#">
      //       <img src="/img/logos/huawei.jpeg" alt="" />
      //     </a>
      //   </li>
      // </ul>

      <div class = "logoutsider">
      <div class="logocontainer">
        
        <div class="avatar">
          <img
            alt=""
            aria-hidden
            src="https://tva1.sinaimg.cn/large/e6c9d24ely1h3fqcx14kvj20e80e874i.jpg"
            class="background"
          />
          <img
            alt="Avatar"
            src="https://tva1.sinaimg.cn/large/e6c9d24ely1h3fqcx14kvj20e80e874i.jpg"
            width="100"
            height="100"
          />
        </div>
        <div class="avatar">
          <img
            alt=""
            aria-hidden
            src="https://pic.stackoverflow.wiki/uploadImages/223/102/83/221/2022/06/21/20/08/a218eb02-a7fd-4893-89d4-99209a552da5.svg"
            class="background"
          />
          <img
            alt="Avatar"
            src="https://pic.stackoverflow.wiki/uploadImages/223/102/83/221/2022/06/21/20/08/a218eb02-a7fd-4893-89d4-99209a552da5.svg"
            width="100"
            height="100"
          />
        </div>
        <div class="avatar">
          <img
            alt=""
            aria-hidden
            src="https://tva1.sinaimg.cn/large/e6c9d24ely1h3g4m3d9zrj205k05k744.jpg"
            class="background"
          />
          <img
            alt="Avatar"
            src="https://tva1.sinaimg.cn/large/e6c9d24ely1h3g4m3d9zrj205k05k744.jpg"
            width="100"
            height="100"
          />
        </div>
        <div class="avatar">
          <img
            alt=""
            aria-hidden
            src="https://pic.stackoverflow.wiki/uploadImages/223/102/83/221/2022/06/21/20/18/70a9cc63-6db3-4053-a301-e5418f1d00ff.svg"
            class="background"
          />
          <img
            alt="Avatar"
            src="https://pic.stackoverflow.wiki/uploadImages/223/102/83/221/2022/06/21/20/18/70a9cc63-6db3-4053-a301-e5418f1d00ff.svg"
            width="100"
            height="100"
          />
        </div>
        <div class="avatar">
          <img
            alt=""
            aria-hidden
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g4vm72jxj2050050q2r.jpg"
            class="background"
          />
          <img
            alt="Avatar"
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g4vm72jxj2050050q2r.jpg"
            width="100"
            height="100"
          />
        </div>

        <div class="avatar">
          <img
            alt=""
            aria-hidden
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g4wq8y9pj2069069jr9.jpg"
            class="background"
          />
          <img
            alt="Avatar"
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g4wq8y9pj2069069jr9.jpg"
            width="100"
            height="100"
          />
        </div>

        <div class="avatar">
          <img
            alt=""
            aria-hidden
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g4zbu6abj20jx0jwdgw.jpg"
            class="background"
          />
          <img
            alt="Avatar"
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g4zbu6abj20jx0jwdgw.jpg"
            width="100"
            height="100"
          />
        </div>

        <div class="avatar">
          <img
            alt=""
            aria-hidden
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g50bimdsj20sg0sgmyd.jpg"
            class="background"
          />
          <img
            alt="Avatar"
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g50bimdsj20sg0sgmyd.jpg"
            width="100"
            height="100"
          />
        </div>

        <div class="avatar">
          <img
            alt=""
            aria-hidden
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g52r58mzj2069069747.jpg"
            class="background"
          />
          <img
            alt="Avatar"
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g52r58mzj2069069747.jpg"
            width="100"
            height="100"
          />
        </div>

        <div class="avatar">
          <img
            alt=""
            aria-hidden
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g53xb8bbj20ak0akdfw.jpg"
            class="background"
          />
          <img
            alt="Avatar"
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g53xb8bbj20ak0akdfw.jpg"
            width="100"
            height="100"
          />
        </div>
        <div class="avatar">
          <img
            alt=""
            aria-hidden
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g56nxlqcj20ak0akglg.jpg"
            class="background"
          />
          <img
            alt="Avatar"
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g56nxlqcj20ak0akglg.jpg"
            width="100"
            height="100"
          />
        </div> <div class="avatar">
          <img
            alt=""
            aria-hidden
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g5880op2j204w04wwea.jpg"
            class="background"
          />
          <img
            alt="Avatar"
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g5880op2j204w04wwea.jpg"
            width="100"
            height="100"
          />
        </div> <div class="avatar">
          <img
            alt=""
            aria-hidden
            src="https://tva1.sinaimg.cn/large/e6c9d24ely1h3eskzhtqqj204g04gwee.jpg"
            class="background"
          />
          <img
            alt="Avatar"
            src="https://tva1.sinaimg.cn/large/e6c9d24ely1h3eskzhtqqj204g04gwee.jpg"
            width="100"
            height="100"
          />
        </div> <div class="avatar">
          <img
            alt=""
            aria-hidden
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g5b0l7l3j2069069mx0.jpg"
            class="background"
          />
          <img
            alt="Avatar"
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g5b0l7l3j2069069mx0.jpg"
            width="100"
            height="100"
          />
        </div> <div class="avatar">
          <img
            alt=""
            aria-hidden
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g5cflcqxj2068069dfs.jpg"
            class="background"
          />
          <img
            alt="Avatar"
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g5cflcqxj2068069dfs.jpg"
            width="100"
            height="100"
          />
        </div> <div class="avatar">
          <img
            alt=""
            aria-hidden
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g5eu1ek9j20fm0cxjs3.jpg"
            class="background"
          />
          <img
            alt="Avatar"
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g5eu1ek9j20fm0cxjs3.jpg"
            width="100"
            height="100"
          />
        </div> <div class="avatar">
          <img
            alt=""
            aria-hidden
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g5gbxxp9j209r07bmwz.jpg"
            class="background"
          />
          <img
            alt="Avatar"
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g5gbxxp9j209r07bmwz.jpg"
            width="100"
            height="100"
          />
        </div> <div class="avatar">
          <img
            alt=""
            aria-hidden
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g5hxcyflj20ak0akjr8.jpg"
            class="background"
          />
          <img
            alt="Avatar"
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g5hxcyflj20ak0akjr8.jpg"
            width="100"
            height="100"
          />
        </div> <div class="avatar">
          <img
            alt=""
            aria-hidden
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g5j8raevj20go0h30sx.jpg"
            class="background"
          />
          <img
            alt="Avatar"
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g5j8raevj20go0h30sx.jpg"
            width="100"
            height="100"
          />
        </div> <div class="avatar">
          <img
            alt=""
            aria-hidden
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g5k883jyj20lg0mmaan.jpg"
            class="background"
          />
          <img
            alt="Avatar"
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g5k883jyj20lg0mmaan.jpg"
            width="100"
            height="100"
          />
        </div>
        <div class="avatar">
          <img
            alt=""
            aria-hidden
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g60z0706j2069069q2r.jpg"
            class="background"
          />
          <img
            alt="Avatar"
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g60z0706j2069069q2r.jpg"
            width="100"
            height="100"
          />
        </div>
        <div class="avatar">
          <img
            alt=""
            aria-hidden
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g5k883jyj20lg0mmaan.jpg"
            class="background"
          />
          <img
            alt="Avatar"
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g5zfpv1ej2069069dfp.jpg"
            width="100"
            height="100"
          />
        </div>
        <div class="avatar">
          <img
            alt=""
            aria-hidden
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g5y3c88wj206l05wt90.jpg"
            class="background"
          />
          <img
            alt="Avatar"
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g5y3c88wj206l05wt90.jpg"
            width="100"
            height="100"
          />
        </div>
        <div class="avatar">
          <img
            alt=""
            aria-hidden
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g5wf22b7j2069069wef.jpg"
            class="background"
          />
          <img
            alt="Avatar"
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g5wf22b7j2069069wef.jpg"
            width="100"
            height="100"
          />
        </div>
        <div class="avatar">
          <img
            alt=""
            aria-hidden
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g5uxgd34j20qo0qh755.jpg"
            class="background"
          />
          <img
            alt="Avatar"
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g5uxgd34j20qo0qh755.jpg"
            width="100"
            height="100"
          />
        </div>
        <div class="avatar">
          <img
            alt=""
            aria-hidden
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g5tmlkslj205v06m745.jpg"
            class="background"
          />
          <img
            alt="Avatar"
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g5tmlkslj205v06m745.jpg"
            width="100"
            height="100"
          />
        </div>
        <div class="avatar">
          <img
            alt=""
            aria-hidden
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g5sp6vx7j2068068dft.jpg"
            class="background"
          />
          <img
            alt="Avatar"
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g5sp6vx7j2068068dft.jpg"
            width="100"
            height="100"
          />
        </div>
        <div class="avatar">
          <img
            alt=""
            aria-hidden
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g5qaf3gcj206d06f0sm.jpg"
            class="background"
          />
          <img
            alt="Avatar"
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g5qaf3gcj206d06f0sm.jpg"
            width="100"
            height="100"
          />
        </div>
        <div class="avatar">
          <img
            alt=""
            aria-hidden
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g5osssoij207b07aq2r.jpg"
            class="background"
          />
          <img
            alt="Avatar"
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g5osssoij207b07aq2r.jpg"
            width="100"
            height="100"
          />
        </div>
        <div class="avatar">
          <img
            alt=""
            aria-hidden
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g5malmpzj2069069aa5.jpg"
            class="background"
          />
          <img
            alt="Avatar"
            src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3g5malmpzj2069069aa5.jpg"
            width="100"
            height="100"
          />
        </div>
        </div>
        {/* <Link
                            to="https://gitter.im/webdriverio/webdriverio"
                            className={
                                'button button--outline button--secondary button--lg'
                              }
                        >更多见用户案例</Link> */}
      </div>

      
      // <div className={styles.companyUsage} ref={this.containerRef}>
      //     <div className={clsx(styles.logos)}>
      //         {this.list()}
      //         <div className={styles.logoNavigation}>
      //             {this.buttons()}
      //         </div>
      //     </div>
      // </div>
    );
  }
}
