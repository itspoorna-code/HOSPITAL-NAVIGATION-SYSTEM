#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <unistd.h>
#include <semaphore.h>
#include <string.h>

int *buf,bufPosition=-1,prodCount,consCount,bufLen;
pthread_t *prod,*cons;
sem_t bufMutex,empCount,fillCount;

int produce(pthread_t self)
{
	int i = 0;
	int p = 1 + rand()%40;
	while(!pthread_equal(*(prod+i),self) && i < prodCount)
	i++;
	printf("\nProducer %d produced %d",i+1,p);
	return p;
}

void *producer()
{
	while(1)     
	{
		int p = produce(pthread_self());  
		sem_wait(&empCount);
		sem_wait(&bufMutex);
		++bufPosition;
		*(buf + bufPosition) = p; 
		sem_post(&bufMutex);
		sem_post(&fillCount);
	
	}		
}

void consume(int p,pthread_t self)
{
	int i = 0;
	while(!pthread_equal(*(cons+i),self) && i < consCount)
	i++;

	printf("\nBuffer:");
	for(i=0;i<=bufPosition;++i)
	printf("%d ",*(buf+i));
	printf("\nConsumer %d consumed %d \nCurrent buffer len: %d\n",i+1,p,bufPosition);
	printf("\n---------------------------------\n");
	
}

void *consumer()
{
	int c;
	while(1)
	{
		sem_wait(&fillCount);
		sem_wait(&bufMutex);
		c = *(buf+bufPosition);	
		consume(c,pthread_self());
		--bufPosition;
		sem_post(&bufMutex);
		sem_post(&empCount);
		sleep(1+rand()%3);
	}
}

int main()
{
	int i,error;
	sem_init(&bufMutex,0,1);
	sem_init(&fillCount,0,0);
	
	printf("\nEnter number of Producers:");
	scanf("%d",&prodCount);
	prod = (pthread_t*) malloc(prodCount*sizeof(pthread_t));
	
	printf("\nEnter number of Consumers:");
	scanf("%d",&consCount);
	cons = (pthread_t*) malloc(consCount*sizeof(pthread_t));
	
	printf("\nEnter buffer size :");
	scanf("%d",&bufLen);
	buf = (int*) malloc(bufLen*sizeof(int));
	sem_init(&empCount,0,bufLen);
	
	for(i=0;i<prodCount;i++)
	{
		error = pthread_create(prod+i,NULL,&producer,NULL);
		if(error != 0)
		printf("\nError creating producer %d: %s",i+1,strerror(error));
		else
		printf("\nSuccessfully created producer %d",i+1);
	}
	
	for(i=0;i<consCount;i++)
	{
		error = pthread_create(cons+i,NULL,&consumer,NULL);
		if(error != 0)
		printf("\nError, Consumer %d can't be Created : %s",i+1,strerror(error));
		else
		printf("\nSuccessfully created consumer %d",i+1);
	}
	
	printf("\n--------------------------------------------");
	
	for(i=0;i<prodCount;i++)
	pthread_join(*(prod+i),NULL);
	
	for(i=0;i<consCount;i++)
	pthread_join(*(cons+i),NULL);
	
	return 0;
}