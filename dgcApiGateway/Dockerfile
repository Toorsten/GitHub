FROM frolvlad/alpine-oraclejdk8:slim
VOLUME /tmp
ADD dgcApiGateway-0.0.1.jar dgcapigateway.jar
RUN sh -c 'touch /dgcapigateway.jar'
ENV JAVA_OPTS=""
ENTRYPOINT [ "sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /dgcapigateway.jar" ]