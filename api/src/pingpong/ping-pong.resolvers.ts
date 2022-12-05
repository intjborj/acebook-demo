import { Resolver, Mutation, Subscription, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PubSubEngine } from 'graphql-subscriptions';
import { PingEnt, PongEnt } from './entities/ping.entity';
import { PingInpt } from './dto/comment.input';

const PONG_EVENT_NAME = 'pong';

@Resolver('Ping')
export class PingPongResolvers {
  constructor(@Inject('PUB_SUB') private pubSub: PubSubEngine) { }

  @Mutation(() => PingEnt)
  async ping() {
    //   async ping( @Args('ping') deleteInput: any,) {
    const pingId = Date.now();
    this.pubSub.publish(PONG_EVENT_NAME, { [PONG_EVENT_NAME]: { pingId } });
    return { id: pingId };
  }

  //   @Subscription(PONG_EVENT_NAME)
  @Subscription(() => PongEnt, {
    filter: (payload: any, variables: any) => { // payload: returned from mutation , variable: params pass from client subscription query
      console.log(payload)
      return true; // compare payload and variable object, if match true else false
    }
  })
  pong(@Args('input') getArgs: PingInpt) {
    return this.pubSub.asyncIterator(PONG_EVENT_NAME);
  }
}