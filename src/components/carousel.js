/**
 * 封装antd Carousel 轮播图组件
 */
import { Component } from "react";
import {WingBlank ,Carousel} from "antd-mobile";
import React from "react";

export default class CarouselItem extends Component {
  constructor() {
    super();
    this.state = {
      data: ["1", "2", "3"],
    };
  }

  render() {
    return (
      <WingBlank>
        <Carousel
          autoplay={true}
          infinite
          beforeChange={(from, to) =>
            console.log(`slide from ${from} to ${to}`)
          }
          dotStyle={{
            width: "28px",
            height: "4px",
            borderRadius: "2px",
            backgroundColor: "#D3D3D3"
          }}
          dotActiveStyle={{
            width: "28px",
            height: "4px",
            borderRadius: "2px",
            backgroundColor: "#101010"
          }}
          afterChange={index => console.log("slide to", index)}
        >
          {this.state.data.map(val => (
            <div
              key={val + ""}
              className={this.props.clsName}
            >
              <img
                src={'http://img4.imgtn.bdimg.com/it/u=2769118404,1000928488&fm=15&gp=0.jpg'}
                alt="加载中..."
                style={{height: '100%', width: "100%", verticalAlign: "top" }}
                onLoad={() => {
                  // fire window resize event to change height
                  // window.dispatchEvent(new Event("resize"));
                  // this.setState({ imgHeight: "auto" });
                }}
              />
            </div>
          ))}
        </Carousel>
      </WingBlank>
    );
  }
}
